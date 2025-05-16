import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import { initOpts } from "./uploadThingHelps";
export const UploadButton = generateUploadButton(initOpts);
export const UploadDropzone = generateUploadDropzone(initOpts);

