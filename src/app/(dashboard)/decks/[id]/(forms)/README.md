# Rich Editor Component

A TipTap-based rich text editor with math support, designed for mobile with dark theme compatibility.

## Features

- **Text Formatting**: Bold, Italic, Underline, Strikethrough, Code
- **Headers**: H1, H2, H3 (directly accessible in toolbar)
- **Block Elements**: Bullet Lists, Ordered Lists, Blockquotes (in dropdown menu)
- **Math Support**: LaTeX math expressions using `@aarkue/tiptap-math-extension`
- **Mobile-First Design**: Inspired by Anki's mobile interface
- **Dark Theme**: Full dark theme support with proper contrast
- **Responsive Toolbar**: Collapsible block menu for better mobile experience

## Usage

```tsx
import { RichEditor } from "./rich-editor";
import { RichEditorView } from "./rich-editor-view";

function MyComponent() {
  const [content, setContent] = useState("");

  return (
    <div>
      <RichEditor
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
        className="my-custom-class"
        disabled={false}
      />

      {/* View mode for displaying content */}
      <RichEditorView content={content} />
    </div>
  );
}
```

## Props

| Prop          | Type                      | Default             | Description                           |
| ------------- | ------------------------- | ------------------- | ------------------------------------- |
| `value`       | `string`                  | `''`                | The HTML content of the editor        |
| `onChange`    | `(value: string) => void` | -                   | Callback when content changes         |
| `placeholder` | `string`                  | `'Start typing...'` | Placeholder text when editor is empty |
| `className`   | `string`                  | -                   | Additional CSS classes                |
| `disabled`    | `boolean`                 | `false`             | Whether the editor is disabled        |

## RichEditorView Component

A view-only component for displaying rich editor content with proper styling.

### Props

| Prop        | Type     | Default | Description                 |
| ----------- | -------- | ------- | --------------------------- |
| `content`   | `string` | -       | The HTML content to display |
| `className` | `string` | -       | Additional CSS classes      |

## Math Support

The editor includes math support using LaTeX syntax:

1. Click the math button (⊕) in the toolbar
2. Enter your LaTeX expression in the input field
3. Press Enter or click "Insert" to add the math

### Examples

- **Inline math**: `E = mc^2` or `x^2 + y^2 = z^2`
- **Block math**: `$$\int_{0}^{\infty} \frac{1}{1 + x^2} dx = \frac{\pi}{2}$$`

## Styling

The component uses Tailwind CSS classes and follows the design system:

- Uses CSS custom properties for theming
- Supports both light and dark themes
- Mobile-responsive design
- Consistent with the app's design language

## Dependencies

- `@tiptap/react` - Core TipTap React integration
- `@tiptap/starter-kit` - Basic editor features
- `@tiptap/extension-placeholder` - Placeholder text
- `@tiptap/extension-text-style` - Text styling
- `@aarkue/tiptap-math-extension` - Math support
- `lucide-react` - Icons
- `@/components/ui/button` - Button component

## Customization

The editor can be customized by:

1. Modifying the toolbar items in the `toolbarItems` array
2. Adding new block types in the `blockItems` array
3. Customizing the math extension configuration
4. Overriding CSS classes for styling

## Demo

See `rich-editor-demo.tsx` for a complete example of how to use the component.
