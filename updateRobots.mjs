import fs from 'fs/promises';
import fetch from 'node-fetch';

async function fetchLatestRobotsTxt() {
  const url = 'https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt';
  console.log(`Fetching from URL: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const content = await response.text();
  console.log('Fetched content:', content);
  return content;
}

async function updateRobotsTxt() {
  try {
    const latestRobotsTxt = await fetchLatestRobotsTxt();
    
    // Extract only the User-agent lines
    const userAgentLines = latestRobotsTxt
      .split('\n')
      .filter(line => line.startsWith('User-agent:'))
      .join('\n');
    
    console.log('Extracted User-agent lines:', userAgentLines);
    
    const robotsTxtPath = './src/pages/robots.txt.ts';
    
    // Create the updated robots.txt content
    const updatedContent = `
import type { APIRoute } from "astro";
import { SITE } from "@config";

const robots = \`
User-agent: Googlebot
Disallow: /nogooglebot/

${userAgentLines}
Disallow: /

User-agent: *
Allow: /

Sitemap: \${new URL("sitemap-index.xml", SITE.website).href}
\`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
`.trim();

    console.log('Updated content:', updatedContent);

    let localRobotsTxt = await fs.readFile(robotsTxtPath, 'utf-8');

    if (updatedContent !== localRobotsTxt) {
      await fs.writeFile(robotsTxtPath, updatedContent);
      console.log('robots.txt.ts updated successfully');
    } else {
      console.log('No changes needed in robots.txt.ts');
    }
  } catch (error) {
    console.error('Error updating robots.txt:', error);
  }
}

updateRobotsTxt().catch(console.error);