import {
    FileText,
    Image,
    FileCode,
    Video,
    Music,
    Archive,
    File,
    BookOpen,
    Table,
    Database,
    Calendar,
    Mail,
    Presentation,
    Globe
} from 'lucide-react';

import { useQuery } from "@tanstack/react-query"
import { default as axios } from "src/lib/axios"
import { SkeletonCard } from "./skeleton-card"

type FileInformation = {
    name: string,
    type: string,
    url: string
}

type Files = {
    message: string,
    files: FileInformation[]
}
const getDocuments = async (): Promise<Files> => {
    const response = await axios.get<Files>('/documents')
    return response.data
}

const FileGallery = () => {
    //
    const { data, isLoading } = useQuery<Files>({
        queryKey: ["documents"],
        queryFn: getDocuments,
        staleTime: 0

    })
    if (isLoading) {
        return <SkeletonCard />
    }
    const files = data?.files
    // Example data - you would replace this with your actual data

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 ">My Files</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files?.map((file, index) => (
                    <FileCard key={index} file={file} />
                ))}
            </div>
        </div>
    );
};

// File card component that displays an individual file
const FileCard = ({ file }: { file: FileInformation }) => {
    const { name, type, url } = file;

    const getFileCategory = (mimeType: string) => {
        const mimeTypeLower = mimeType.toLowerCase();

        // Document types
        if (mimeTypeLower.includes('text/plain') ||
            mimeTypeLower.includes('text/rtf') ||
            mimeTypeLower.includes('application/rtf') ||
            mimeTypeLower.includes('application/msword') ||
            mimeTypeLower.includes('application/vnd.openxmlformats-officedocument.wordprocessingml') ||
            mimeTypeLower.includes('application/vnd.oasis.opendocument.text')) {
            return 'document';
        }

        // Image types
        if (mimeTypeLower.startsWith('image/')) {
            return 'image';
        }

        // Code/Programming types
        if (mimeTypeLower.includes('text/html') ||
            mimeTypeLower.includes('text/css') ||
            mimeTypeLower.includes('text/javascript') ||
            mimeTypeLower.includes('application/json') ||
            mimeTypeLower.includes('application/xml') ||
            mimeTypeLower.includes('text/xml') ||
            mimeTypeLower.includes('application/typescript')) {
            return 'code';
        }

        // Video types
        if (mimeTypeLower.startsWith('video/')) {
            return 'video';
        }

        // Audio types
        if (mimeTypeLower.startsWith('audio/')) {
            return 'audio';
        }
        // Archive types
        if (mimeTypeLower.includes('application/zip') ||
            mimeTypeLower.includes('application/x-rar-compressed') ||
            mimeTypeLower.includes('application/x-tar') ||
            mimeTypeLower.includes('application/gzip') ||
            mimeTypeLower.includes('application/x-7z-compressed')) {
            return 'archive';
        }

        // PDF
        if (mimeTypeLower === 'application/pdf') {
            return 'pdf';
        }

        // Presentation
        if (mimeTypeLower.includes('application/vnd.ms-powerpoint') ||
            mimeTypeLower.includes('application/vnd.openxmlformats-officedocument.presentationml') ||
            mimeTypeLower.includes('application/vnd.oasis.opendocument.presentation')) {
            return 'presentation';
        }

        // Spreadsheet
        if (mimeTypeLower.includes('application/vnd.ms-excel') ||
            mimeTypeLower.includes('application/vnd.openxmlformats-officedocument.spreadsheetml') ||
            mimeTypeLower.includes('application/vnd.oasis.opendocument.spreadsheet') ||
            mimeTypeLower.includes('text/csv')) {
            return 'spreadsheet';
        }

        // Database
        if (mimeTypeLower.includes('application/sql') ||
            mimeTypeLower.includes('application/x-sqlite3') ||
            mimeTypeLower.includes('application/vnd.oasis.opendocument.database')) {
            return 'database';
        }

        // Email
        if (mimeTypeLower.includes('message/rfc822') ||
            mimeTypeLower.includes('application/vnd.ms-outlook')) {
            return 'email';
        }

        // Calendar
        if (mimeTypeLower.includes('text/calendar')) {
            return 'calendar';
        }

        // Web
        if (mimeTypeLower.includes('application/xhtml+xml')) {
            return 'web';
        }

        // Default/unknown
        return 'unknown';
    };

    // Get the appropriate icon based on file category derived from MIME type
    const getFileIcon = () => {
        const category = getFileCategory(type);

        switch (category) {
            case 'document':
                return <FileText size={48} />;
            case 'image':
                return <Image size={48} />;
            case 'code':
                return <FileCode size={48} />;
            case 'video':
                return <Video size={48} />;
            case 'audio':
                return <Music size={48} />;
            case 'archive':
                return <Archive size={48} />;
            case 'pdf':
                return <BookOpen size={48} />;
            case 'spreadsheet':
                return <Table size={48} />;
            case 'presentation':
                return <Presentation size={48} />;
            case 'database':
                return <Database size={48} />;
            case 'email':
                return <Mail size={48} />;
            case 'calendar':
                return <Calendar size={48} />;
            case 'web':
                return <Globe size={48} />;
            default:
                return <File size={48} />;
        }
    };


    const getFileTypeName = (mimeType: string) => {
        const category = getFileCategory(mimeType);

        switch (category) {
            case 'document':
                return 'Document';
            case 'image':
                return 'Image';
            case 'code':
                if (mimeType.includes('html')) return 'HTML';
                if (mimeType.includes('css')) return 'CSS';
                if (mimeType.includes('javascript')) return 'JavaScript';
                if (mimeType.includes('json')) return 'JSON';
                if (mimeType.includes('xml')) return 'XML';
                return 'Code';
            case 'video':
                return 'Video';
            case 'audio':
                return 'Audio';
            case 'archive':
                if (mimeType.includes('zip')) return 'ZIP';
                if (mimeType.includes('rar')) return 'RAR';
                if (mimeType.includes('tar')) return 'TAR';
                if (mimeType.includes('7z')) return '7-Zip';
                return 'Archive';
            case 'pdf':
                return 'PDF';
            case 'spreadsheet':
                return 'Spreadsheet';
            case 'presentation':
                return 'Presentation';
            case 'database':
                return 'Database';
            case 'email':
                return 'Email';
            case 'calendar':
                return 'Calendar';
            case 'web':
                return 'Web Page';
            default:
                return 'File';
        }
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
        >
            <div className="p-6 flex flex-col items-center">
                <div className=" mb-4">
                    {getFileIcon()}
                </div>
                <div className="">
                    <h3 className="text-center font-medium  truncate" title={name}>
                        {name}
                    </h3>
                    <p className="text-xs text-center mt-1">
                        {getFileTypeName(type)}
                    </p>
                </div>
            </div>
        </a>
    );
};

export default FileGallery;
