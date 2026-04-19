import { JSX } from 'react';
import { UpTaskLayout } from './UpTaskLayout';
import { Tabs } from '../components/profile/Tab';

interface SectionUserLayoutProps {
    children: JSX.Element | JSX.Element[], 
}

export const SectionUserLayout = ({children}:SectionUserLayoutProps) => {
    return (
        <UpTaskLayout>
            <section className='flex justify-center max-[420px]:p-0'>
                <div className="max-w-full w-[1250px]">
                    <Tabs/>                        
                    {children}
                </div>
            </section>
        </UpTaskLayout>
    )
}
 