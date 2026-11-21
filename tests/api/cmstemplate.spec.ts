
// test('an article created via API appears in the CMS list @e2e', async ({ page, request }) => {
//     const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' };

//     // 1. ARRANGE through the API: fast and reliable
//     const created = await request.post('/api/articles', {
//         data: { title: 'Test article from API', status: 'published' },
//         headers,
//     });
//     expect(created.status()).toBe(201);
//     const article = (await created.json()).data;

//     try {
//         // 2. ACT + ASSERT in the UI
//         await page.goto('/admin/articles');
//         await expect(page.getByText('Test article from API')).toBeVisible();
//     } finally {
//         // 3. CLEAN UP through the API
//         await request.delete(`/api/articles/${article.id}`, { headers });
//     }
// });