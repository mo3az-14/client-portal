import { default as axios } from "src/lib/axios";
import { UploadDropzone, UploadButton } from "src/components/upload";

const Upload = () => {
    return (
        <>
            < div className="w-full h-screen flex flex-col gap-4 justify-center items-center p-8 ">
                <UploadDropzone
                    className="size-96 rounded-xl hover:cursor-pointer"
                    endpoint="videoAndImage"
                    onUploadBegin={(name) => {
                        console.log("Uploading: ", name);
                    }}
                    onClientUploadComplete={(file) => {
                        console.log("successfully uploaded files: ")
                        console.log(file)
                    }}
                    onUploadError={(error) => {
                        console.error(error, error.cause);
                        alert("Upload failed");
                    }}
                />
                <div >
                    <UploadButton
                        className="bg-slate-900 w-96 rounded-xl "
                        endpoint="videoAndImage"

                        onClientUploadComplete={(file) => {
                            axios.post('/documents', { files: file }).then((res) => {
                                console.log(res)
                            }).catch(err => console.log(err))
                        }}
                        onUploadAborted={() => {
                            alert("Upload aborted");
                        }}
                        onUploadError={(error) => {
                            console.error(error, error.cause);
                            alert("Upload failed");
                        }}
                        onUploadBegin={(name) => {
                            console.log("Uploading: ", name);
                        }}
                    />
                </div>

            </div>
        </>
    )
}

export default Upload
