export default function handler(req, res) {
    const articles = [
        {
          id: '1',
          title: 'GitHub introduces dark mode and auto-merge pull request',
          excerpt:
            'GitHub today announced a bunch of new features at its virtual GitHub...',
          body:
            'GitHub today announced a bunch of new features at its virtual GitHub Universe conference including dark mode, auto-merge pull requests, and Enterprise Server 3.0. In the past couple of years, almost all major apps have rolled out a dark theme for its users, so why not GitHub?',
        }
    ]
    res.status(200).json(articles)
}
  