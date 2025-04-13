# Contributing to Upcoming Streams Twitch Extension

First off, thank you for considering contributing to the Upcoming Streams Twitch Extension! It's people like you that make this extension better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers through the project's issue tracker.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (browser, OS, etc.)
- Any additional context

### Suggesting Enhancements

If you have an idea for a new feature or an improvement:

1. Check if it's already been suggested
2. Provide a clear and detailed explanation of the feature
3. Explain why this enhancement would be useful
4. Suggest a possible implementation approach if you have one

### Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Set up your development environment:
   ```bash
   npm install
   ```

4. Make your changes following our coding guidelines
5. Test your changes:
   ```bash
   npm run lint     # Run linting
   npm run build    # Ensure it builds
   ```

6. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

7. Push to your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```

8. Open a Pull Request

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Ensure strict type checking passes
- Document complex types

### Vue Components

- Use Vue 3 script setup Composition API
- Keep components focused and single-responsibility
- Use proper prop types and validation
- Document component props and events

### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain theme compatibility
- Keep customization options in mind

### Commits

- Use clear and descriptive commit messages
- Reference issues and pull requests
- Keep commits focused and atomic

### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation if you're changing functionality
3. Ensure all linting passes (`npm run lint`)
4. The PR will be merged once you have the sign-off of at least one maintainer

## Theme Development

When creating or modifying themes:

1. Follow the existing theme structure in `src/common/themes`
2. Ensure all required color properties are defined
3. Test the theme in both light and dark modes
4. Consider accessibility (contrast ratios)
5. Provide a meaningful theme name

## Development Setup Tips

1. Local Development:
   ```bash
   npm run dev
   ```

2. Testing in Twitch:
   - Create a test extension in your Twitch Developer Console
   - Configure local testing
   - Use the provided test viewer

3. Debugging:
   - Use Vue DevTools
   - Check browser console for errors
   - Test in different browsers

## Questions?

Feel free to open an issue for:
- Help with development
- Clarification on guidelines
- Suggestions for improvement
- General questions

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Twitch Extensions Documentation](https://dev.twitch.tv/docs/extensions)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) 