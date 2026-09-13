import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBootstrap } from '@/lib/api';
import { Reveal } from '@/components/Reveal';

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
      <div className="orb left-[-10%] top-[-10%] h-96 w-96 bg-gold/15" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em]">
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-gold">
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
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/60 via-line to-transparent" />
          <div className="prose-spring mt-10">
            {(post.content || '').split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-8 text-center">
            <p className="font-display text-xl font-semibold">Build the future with Spring.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              We’re partnering with banks, fintechs, real estate firms, and communities across
              Africa.
            </p>
            <Link href="/contact" className="btn-gold mt-6">
              Partner with Spring
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
