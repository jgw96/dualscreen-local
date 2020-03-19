import { newE2EPage } from '@stencil/core/testing';

describe('place-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<place-detail></place-detail>');
    const element = await page.find('place-detail');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
