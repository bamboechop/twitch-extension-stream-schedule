import { ref, computed } from 'vue'

export interface ChangelogVersion {
  version: string
  date: string
  sections: { [key: string]: string[] }
  unsectionedItems: string[]
}

export function useChangelog() {
  const changelog = ref<ChangelogVersion[]>([])
  const error = ref<string | null>(null)

  // Get language from URL params
  const getLanguageFromUrl = (): string => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('language') || 'en'
  }

  // Parse changelog content
  const parseChangelogContent = (content: string): ChangelogVersion[] => {
    const lines = content.split('\n')
    const versions: ChangelogVersion[] = []

    let currentVersion = ''
    let currentDate = ''
    let sections: { [key: string]: string[] } = {}
    let unsectionedItems: string[] = []
    let currentSection = ''
    let isParsingVersion = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Match version header: ## [1.3.0] - 2025-07-25
      const versionMatch = line.match(/^## \[([^\]]+)\] - (.+)$/)
      if (versionMatch) {
        // Save previous version if we were parsing one
        if (isParsingVersion && currentVersion) {
          versions.push({
            version: currentVersion,
            date: currentDate,
            sections: { ...sections },
            unsectionedItems: [...unsectionedItems]
          })
        }

        // Start parsing new version
        currentVersion = versionMatch[1]
        currentDate = versionMatch[2]
        sections = {}
        unsectionedItems = []
        currentSection = ''
        isParsingVersion = true
        continue
      }

      if (!isParsingVersion) continue

      // Match section headers: ### Added, ### Changed, ### Fixed
      const sectionMatch = line.match(/^### (.+)$/)
      if (sectionMatch) {
        currentSection = sectionMatch[1].toLowerCase()
        if (!sections[currentSection]) {
          sections[currentSection] = []
        }
        continue
      }

      // Match list items: - Item text
      if (line.startsWith('- ')) {
        if (currentSection) {
          // We're in a section, add to that section
          sections[currentSection].push(line.substring(2))
        } else {
          // No current section, add to unsectioned items
          unsectionedItems.push(line.substring(2))
        }
      }
    }

    // Don't forget the last version
    if (isParsingVersion && currentVersion) {
      versions.push({
        version: currentVersion,
        date: currentDate,
        sections: { ...sections },
        unsectionedItems: [...unsectionedItems]
      })
    }

    return versions
  }

  // Load changelog based on language
  const loadChangelog = async (language?: string) => {
    error.value = null

    try {
      const lang = language || getLanguageFromUrl()
      const fileName = lang === 'de' ? 'CHANGELOG-de.md' : 'CHANGELOG.md'

      const response = await fetch(`/${fileName}`)
      if (!response.ok) {
        throw new Error(`Failed to load changelog: ${response.status}`)
      }

      const content = await response.text()
      changelog.value = parseChangelogContent(content)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load changelog'
      changelog.value = []
    }
  }

  // Computed property for the latest version
  const latestVersion = computed(() => changelog.value[0] || null)

  return {
    changelog,
    error,
    latestVersion,
    loadChangelog,
    getLanguageFromUrl
  }
}
