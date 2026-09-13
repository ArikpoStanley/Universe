import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getBootstrap } from '@/lib/api';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights that shape the future of mortgages in Africa.',
};

export default async function BlogPage() {
  const data = await getBootstrap();
  const posts = data.posts;

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-10 pt-40 md:px-8 md:pt-48">
        <div className="absolute inset-0 bg-grid-gold opacity-70" />
        <div className="orb left-[-8%] top-[-20%] h-96 w-96 bg-gold/20" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                Blog
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Insights that shape the <span className="text-gold-gradient">future of mortgages</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-muted">
              Thinking on infrastructure, housing, and Africa’s financial rails — from the Spring
              team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8">
        <Stagger className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="glass-card relative flex h-full flex-col overflow-hidden p-8">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl transition-all duration-500 group-hover:bg-gold/25" />
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
                  <h2 className="mt-5 font-display text-2xl font-bold leading-snug transition-colors group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold">
                    Read article
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
