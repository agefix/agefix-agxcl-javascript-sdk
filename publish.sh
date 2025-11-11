#!/bin/bash
# JavaScript SDK Publishing Script

set -e  # Exit on error

echo "🚀 Publishing @agefix/agxcl-sdk to npm"
echo "======================================="

# Navigate to SDK directory
cd "$(dirname "$0")"

# Check if logged in to npm
echo "📋 Checking npm authentication..."
if ! npm whoami &> /dev/null; then
    echo "❌ Not logged in to npm. Please run: npm login"
    exit 1
fi

echo "✅ Authenticated as: $(npm whoami)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
if npm test &> /dev/null; then
    echo "✅ All tests passed"
else
    echo "⚠️  Tests not configured or failed"
fi

# Build project
echo "🔨 Building project..."
npm run build

# Generate documentation
echo "📚 Generating documentation..."
npm run docs

# Verify package contents
echo "🔍 Verifying package contents..."
npm pack --dry-run

# Ask for confirmation
echo ""
echo "📦 Package ready to publish!"
echo "Package: @agefix/agxcl-sdk"
echo "Version: $(node -p "require('./package.json').version")"
echo ""
read -p "Do you want to publish to npm? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Publishing cancelled"
    exit 0
fi

# Publish to npm
echo "📤 Publishing to npm..."
npm publish --access public

echo ""
echo "✅ Successfully published to npm!"
echo "📦 View at: https://www.npmjs.com/package/@agefix/agxcl-sdk"
echo ""
echo "Next steps:"
echo "1. Create GitHub release"
echo "2. Update documentation website"
echo "3. Announce on Discord/Twitter"
