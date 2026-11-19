'use client';

import DOMPurify from 'isomorphic-dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useMemo } from 'react';
import { sanitizeMathLatex } from '@/lib/math-latex';

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'b',
    'em',
    'i',
    'u',
    's',
    'strike',
    'sub',
    'sup',
    'h1',
    'h2',
    'h3',
    'ul',
    'ol',
    'li',
    'blockquote',
    'pre',
    'code',
    'a',
    'img',
    'span',
    'mark',
    'div',
    'math',
    'semantics',
    'mrow',
    'mi',
    'mo',
    'mn',
    'msup',
    'msub',
    'mfrac',
    'msqrt',
    'mroot',
    'annotation',
  ],
  ALLOWED_ATTR: [
    'href',
    'target',
    'rel',
    'src',
    'alt',
    'title',
    'class',
    'style',
    'width',
    'height',
    'data-type',
    'data-latex',
    'contenteditable',
    'aria-hidden',
    'xmlns',
  ],
  ALLOW_DATA_ATTR: true,
};

function isRichTextEmpty(html: string | null | undefined) {
  if (!html) return true;
  const plain = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return !plain;
}

function renderLatex(latex: string, displayMode: boolean) {
  const cleaned = sanitizeMathLatex(latex);
  if (!cleaned) return '';
  try {
    return katex.renderToString(cleaned, {
      throwOnError: false,
      displayMode,
      strict: 'ignore',
    });
  } catch {
    return cleaned;
  }
}

function hydrateMathHtml(html: string): string {
  if (!html) return '';
  let next = html.replace(
    /<(span|div)([^>]*?)data-type="(inline-math|block-math)"([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_full, _tag: string, pre: string, type: string, post: string) => {
      const attrs = `${pre} ${post}`;
      const latexMatch = attrs.match(/data-latex="([^"]*)"/i);
      const latex = latexMatch?.[1]
        ? latexMatch[1]
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
        : '';
      if (!latex) return '';
      const rendered = renderLatex(latex, type === 'block-math');
      return type === 'block-math'
        ? `<div class="universe-math-block">${rendered}</div>`
        : `<span class="universe-math-inline">${rendered}</span>`;
    },
  );

  next = next.replace(/\$\$([\s\S]+?)\$\$/g, (_m, latex: string) => {
    return `<div class="universe-math-block">${renderLatex(latex.trim(), true)}</div>`;
  });
  next = next.replace(/\$([^$\n]+?)\$/g, (_m, latex: string) => {
    return `<span class="universe-math-inline">${renderLatex(latex.trim(), false)}</span>`;
  });

  return next;
}

type RichTextHtmlProps = {
  html: string | null | undefined;
  className?: string;
  as?: 'div' | 'span';
};

/** Sanitize + render TipTap HTML (including KaTeX math) for public apply prompts. */
export function RichTextHtml({ html, className, as = 'div' }: RichTextHtmlProps) {
  const clean = useMemo(() => {
    if (isRichTextEmpty(html)) return '';
    const hydrated = hydrateMathHtml(html ?? '');
    return DOMPurify.sanitize(hydrated, PURIFY_CONFIG);
  }, [html]);

  if (!clean) return null;

  const Tag = as;
  return (
    <Tag
      className={['universe-rich-text', className].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
