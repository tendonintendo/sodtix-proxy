export default async function handler(req, res) {
  try {
    const response = await fetch('https://sodtix.com/api/v1/public-events/link-url/I93nOjd8');
    const result = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: 'Failed' });
  }
}