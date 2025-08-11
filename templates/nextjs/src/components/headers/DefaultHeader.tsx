import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/container';
import { ThemeToggle, AccentToggle } from '@/components/themetoggle';
import { getHeaderContent } from '@/lib/headerContent';

const DefaultHeader = async () => {
  const { logo, logoDark, title, links } = await getHeaderContent();

  return (
    <header className="py-3 pt-4 bg-transparent">
      <Container maxWidth="max-w-[120rem]" className="flex ml-5 mr-5 md:ml-7 md:mr-7 lg:ml-9 lg:mr-10 xl:ml-10 xl:mr-11 2xl:ml-13 2xl:mr-13 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 text-accent-11">
          {logo && (
            logoDark ? (
              <>
                <Image src={logoDark} alt="Logo" width={36} height={36} className="h-auto hidden dark:block" />
                <Image src={logo} alt="Logo" width={36} height={36} className="h-auto block dark:hidden" />
              </>
            ) : (
              <Image src={logo} alt="Logo" width={36} height={36} className="h-auto dark:invert" />
            )
          )}
          {title && <span className="font-semibold text-xl">{title}</span>}
        </Link>
        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex items-center space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-accent-11 hover:text-accent-12">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <AccentToggle className="inline-flex border-1 !border-[var(--color-border-accent)] hover:!border-[var(--color-border-accent-hover)] text-[var(--color-accent-11)] dark:border" />
          <ThemeToggle className="text-accent-11 border-1 !border-[var(--color-border-accent)] hover:!bg-[var(--color-accent-a3)] dark:!border-[var(--color-border-accent)]" />
        </div>
      </Container>
    </header>
  );
};

export default DefaultHeader;


