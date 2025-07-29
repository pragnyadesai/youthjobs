export default async function handler(req, res) {
  const app_id = process.env.b223eb6c;
  const app_key = process.env.391a584960243c06be06066154d7efd3;

  const { page = 1 } = req.query;

  const url = `https://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=${app_id}&app_key=${app_key}&results_per_page=50`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Filter jobs for teens
    const filteredJobs = data.results.filter(job => {
      const title = job.title.toLowerCase();
      const description = job.description.toLowerCase();

      return (
        title.includes('teen') ||
        title.includes('youth') ||
        title.includes('internship') ||
        title.includes('part-time') ||
        description.includes('teen') ||
        description.includes('youth') ||
        description.includes('internship') ||
        description.includes('part-time')
      );
    });

    res.status(200).json({ jobs: filteredJobs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}
