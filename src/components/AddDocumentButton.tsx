'use client';
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createDocument } from '@/lib/server-actions/room.actions';
import { useRouter } from 'next/navigation';
import { DocumentsRoute } from '@/lib/routes';

const AddDocumentButton = ({ userId, email }: AddDocumentBtnProps) => {
    const router = useRouter();
    // create document, if successful then route to the document
    const addDocHandler = async () => {
        //console.log('xxxxx add doc handler xxxxx')
        try { 
            const doc = await createDocument({userId, email});
            if (doc) {
                router.push(`${DocumentsRoute.href}/${doc.id}`);
            }
        }
        catch (error) {
            console.error(error)
        }
    }
  return (
    <Button type='submit' onClick={addDocHandler} className='gradient-blue flex gap-1 shadow-md'>
        <Image
          src="/assets/icons/add.svg"
          alt="Add Document"
          width={24}
          height={24}
        />
        <p>New Document</p>
    </Button>
  )
}

export default AddDocumentButton
