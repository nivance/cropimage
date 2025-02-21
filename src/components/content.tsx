import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Game } from '@/models/types/game';
import { getTranslations } from 'next-intl/server';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

export default async function Content({
    game, gameDesc
}: {
    game: Game;
    gameDesc: string;
}) {
    const t = await getTranslations('nav');
    const categoryName = game.type.length > 0 ? game.type[0] : `${t('others')}`;

    const others = await getTranslations('others');

    // Convert markdown to HTML
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(gameDesc);
    const contentHtml = processedContent.toString();

    return (
        <article className="w-full mx-auto px-4 py-4">
            <nav className="flex items-center text-sm text-gray-500 mb-6">
                <Link href="/" className="text-2xl font-bold hover:text-blue-600">{others('home')}</Link>
                <ChevronRight className="mx-2" size={24} />
                <Link href={`/category/${categoryName}`} className="text-2xl font-bold hover:text-blue-600">{categoryName}</Link>
                <ChevronRight className="mx-2" size={24} />
                <span className="text-2xl font-bold">{game.title}</span>
            </nav>
            <div
                className="prose-invert prose-base prose max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </article>
    )
}