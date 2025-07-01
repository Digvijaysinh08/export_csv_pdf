import { chromium } from 'playwright';
import ejs from 'ejs';

export const ejsTemplateToPdfBuffer = async (templateContent: string, data: object[] | Record<string, any>) => {
    const compiledTemplate = ejs.compile(templateContent);
    const htmlContent = compiledTemplate({ data });
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
    });

    await browser.close();

    return pdfBuffer;
};
