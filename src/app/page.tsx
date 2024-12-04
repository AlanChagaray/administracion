'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);

    return (
        <div>
            <Spinner/>
        </div>
    );
};

export default Page;
