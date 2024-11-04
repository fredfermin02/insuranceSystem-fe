import { useDropzone } from 'react-dropzone';
import { useFormContext, Controller } from 'react-hook-form';
import Image from 'next/image';
import React from 'react';
import { CalendarDatePicker } from './CalendarDatePicker';

import {xlsx_file_image } from '@/assets/images';
interface DropzoneProps {
  name: string;
  onUpload: () => void; // Add the onUpload function as a prop to trigger form submission
}

const Dropzone: React.FC<DropzoneProps> = ({ name, onUpload }) => {
  const { setValue, control } = useFormContext(); // Access the form context

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setValue(name, acceptedFiles[0]); // Set the file in the form state
      onUpload(); // Trigger the form submission after file upload
    },
  });

  return (
    <div className="container p-6 bg-white shadow-md flex flex-col items-center rounded-md">
      <div
        {...getRootProps({
          className: `dropzone w-full h-68 border-2 border-dashed border-gray-300 flex flex-col justify-center items-center rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-300 ${
            isDragActive ? 'border-blue-800' : ''
          }`,
        })}
      >
        <input {...getInputProps()} />
        <Image src={xlsx_file_image} alt="Upload CSV" width={144} height={144} />
        <p className="text-gray-500">Drag 'n' drop a file here, or click to select one</p>
      </div>

      <div className="mt-4">
        <Controller
          name="dateOfFile"
          control={control}
          render={({ field }) => <CalendarDatePicker field={field} />}
        />
      </div>
    </div>
  );
};

export default Dropzone;
