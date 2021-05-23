import React, { FormEvent, useState } from 'react';

interface FileUploadProps {
    onUpload: ((files: FileList) => void)
}

export const FileUpload:React.FC<FileUploadProps> = ({onUpload}) => {

    const [fileInput, setFileInput] = useState<HTMLInputElement>();

    const onChangeFile = (event: React.FormEvent<HTMLInputElement>) => {
        setFileInput(event.currentTarget);
    }

    const handleSubmit = (event: FormEvent) : void => {
        if(event == null) return;
        event.preventDefault();
        //console.log(fileInput.current.files[0].name);
        console.log(fileInput?.value);
        onUpload(fileInput?.files!);
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <label>
            Upload file:
            <input type="file" onChange={onChangeFile} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}