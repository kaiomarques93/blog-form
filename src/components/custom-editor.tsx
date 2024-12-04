import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
} from 'react-simple-wysiwyg'

type Props = {
  text: string
  handleChange: (text: string) => void
}

export function CustomEditor({ text, handleChange }: Props) {
  function onChange(e: { target: { value: string } }) {
    handleChange(e.target.value)
  }

  return (
    <EditorProvider>
      <Editor value={text} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
        </Toolbar>
      </Editor>
    </EditorProvider>
  )
}
