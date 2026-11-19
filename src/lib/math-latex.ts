/**
 * Normalize TipTap / MathLive LaTeX so KaTeX can render it on the public apply page.
 */
export function sanitizeMathLatex(raw: string): string {
  let latex = String(raw ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  latex = latex.replace(/\\placeholder(\[[^\]]*\])?\{[^{}]*\}/g, '');
  latex = latex.replace(/\\placeholder(\[[^\]]*\])?/g, '');
  latex = latex.replace(/\\mathnn\b/g, '\\mathrm');
  latex = latex.replace(/\\ whitetext\b/g, '');
  latex = latex.replace(/\{\s*\}/g, '{}');
  latex = latex.replace(/\s{2,}/g, ' ').trim();

  return latex;
}
