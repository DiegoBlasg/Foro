import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import 'react-quill/dist/quill.snow.css';
import './styles.css'
const TextEditor = ({ value, setValue }) => {
    return (
        <div className="text-black dark:text-white my-2 w-full">
            <EditorToolbar toolbarId={'t1'} />
            <div className=" shadow-md">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules('t1')}
                    formats={formats} />
            </div>
            <h1 className='mt-2 text-sm'>(max: 5 Mb)</h1>
        </div>
    )
}
export default TextEditor