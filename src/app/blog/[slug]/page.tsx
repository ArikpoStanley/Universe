import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBootstrap } from '@/lib/api';
import { Reveal } from '@/components/Reveal';
import { portalHref } from '@/lib/portal';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getBootstrap();
  const post = data.posts.find((p) => p.slug === params.slug);
  return { title: post?.title || 'Article', description: post?.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const data = await getBootstrap();
  const post = data.posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="relative overflow-hidden px-5 pb-24 pt-40 md:px-8 md:pt-48">
      <div className="orb left-[-10%] top-[-10%] h-96 w-96 bg-accent/15" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-soft"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em]">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-accent-soft">
              {post.tag}
            </span>
            <span className="text-muted/70">
              {new Date(post.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-accent/60 via-line to-transparent" />
          <div className="prose-universe mt-10 space-y-4 text-muted leading-relaxed">
            {(post.content || '').split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-8 text-center">
            <p className="font-display text-xl font-semibold">Create your school on Universe.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Three guided steps — institution type, school details, and your first admin account.
            </p>
            <a href={portalHref('create')} className="btn-primary mt-6 inline-flex">
              Create school
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
