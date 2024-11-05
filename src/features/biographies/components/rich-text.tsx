"use client"

import '@/styles/biography-styles.scss'

import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Bold, Heading1, Heading2, Heading3, Image as ImageIcon, Italic, List, ListOrdered, SquareSplitVertical, Strikethrough, UnderlineIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Placeholder from '@tiptap/extension-placeholder'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap border-b-2 border-gray-light px-8 py-2 items-center gap-1">
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleHeading({level: 1})
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('heading', {level: 1}) ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <Heading1/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleHeading({level: 1})
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('heading', {level: 2}) ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <Heading2/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleHeading({level: 1})
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('heading', {level: 3}) ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <Heading3/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('bold') ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <Bold/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('italic') ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <Italic/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('underline') ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <UnderlineIcon/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('strike') ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <Strikethrough/>
        </button>
        
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <ListOrdered/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            className={`p-1 rounded-ms transition-all duration-200 
                        ${editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-transparent text-gray-dark'}
                    `}
        >
            <List/>
        </button>
        <button
            type='button'
            className='text-gray-dark'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
            <SquareSplitVertical />
        </button>
    </div>
  )
}

const extensions = [
  TextStyle,
  ListItem, 
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Underline,
  Placeholder.configure({
    emptyEditorClass: 'is-editor-empty',
    placeholder: "Escribe aqui la biografía"
  }),
  Document,
  Text,
  Dropcursor,
  Paragraph
]

interface RichTextProps{
    onChange?: (value: string)=>void,
    content?: string,
    error?: string | null
}


const RichText: React.FC<RichTextProps> = ({
    onChange,
    content,
    error
}) => {
    const [isFocus, setIsFocus] = useState(false)
    return (
        <div>
            <div className={`border-solid transition-all h-full bg-white rounded-ms border-2 space-y-1
                ${error ? "border-red-500" : isFocus ? "border-primary" : "border-slate-e"}`}>
                <EditorProvider 
                    slotBefore={<MenuBar />} 
                    extensions={extensions} 
                    content={content}
                    immediatelyRender={false}
                    editorProps={{
                        attributes: {
                            class: 'outline-none py-2 px-8 min-h-[15rem] max-h-[20rem] overflow-y-auto', // Aplica la clase personalizada para estilos específicos
                        },
                    }}
                    onUpdate={({editor})=>{
                        if(onChange) {
                            if(!editor.getText()){
                                onChange("")
                            }else{
                                onChange(editor.getHTML())
                            } 
                        }
                        console.log(editor.getText())
                    }}
                    onFocus={()=>setIsFocus(true)}
                    onBlur={()=>setIsFocus(false)}
                >
                </EditorProvider>
            </div>
            {error && (<span className="text-red-500 text-sm" >{error}</span>)}
        </div>
    )
}

export default RichText;