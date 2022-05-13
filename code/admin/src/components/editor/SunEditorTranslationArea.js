import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function SunEditorTranslationArea({
    initialContent,
    setContent
}) {

    return (
        <div>
            <SunEditor
                width="100%"
                height="150px"
                setOptions={{
                    buttonList: [
                        // default
                        ["undo", "redo"],
                        ["bold", "underline", "italic", "list"],
                        ["table", "link", "image"],
                        ["fullScreen"]
                    ]
                }}
                setContents={initialContent}
                onChange={setContent}
            />
        </div>
    );
};

export default SunEditorTranslationArea