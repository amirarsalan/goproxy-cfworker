# GoProxy CFWorker: Your Go Module Proxy, Powered by Cloudflare Workers

GoProxy CFWorker is a lightweight and efficient Go module proxy designed to run on Cloudflare Workers. It simplifies the process of serving Go modules, leveraging Cloudflare's global network for low-latency distribution and robust performance. We handle `go-import` routing seamlessly, allowing you to focus on your code.

## Key Features

* **Go Module Proxy**: Serves Go modules with full `go-import` meta tag support.
* **Cloudflare Workers Integration**: Deploys effortlessly on Cloudflare's edge network for global reach.
* **Flexible Routing**: Customize module path resolution with configurable routing rules.
* **Authentication Support**: Securely manage access to private modules with built-in authentication.

## Getting Started

Here's how to get GoProxy CFWorker up and running:

### Prerequisites

* **Cloudflare Account**: You'll need an active Cloudflare account to deploy your worker.
* **Wrangler CLI**: Cloudflare's command-line tool. Install it globally via npm:

    ```bash
    npm install -g wrangler
    ```

* **Node.js**: Ensure Node.js is installed for dependency management.

### Installation and Deployment


1. **Clone the Repository**:

   ```bash
   git clone https://github.com/amirarsalan/goproxy-cfworker.git
   cd goproxy-cfworker
   ```

2. **Install Dependencies**:

   Use your preferred package manager to install the necessary dependencies. For example, with Yarn:

   ```bash
   yarn install
   ```

3. **Login to Wrangler**:

   Authenticate Wrangler with your Cloudflare account by running:

   ```bash
   wrangler login
   ```

   This command will open a browser window to complete the authentication process.

4. **Deploy the Worker**:

   Use Wrangler to publish your worker:

   ```bash
   wrangler publish
   ```

   This command will deploy the worker to Cloudflare's network.

## Usage

Once deployed, your GoProxy CFWorker will be accessible at the assigned URL (e.g., `https://go.your-subdomain.workers.dev`). You can configure your Go environment to use this proxy by setting the `GOPROXY` environment variable:

```bash
export GOPROXY=https://go.your-subdomain.workers.dev
```

Replace `https://go.your-subdomain.workers.dev` with your actual worker URL.

## Customizing Module Routing


The core of GoProxy CFWorker's flexibility lies in its routing configuration. You can manage module paths and authentication settings by editing src/projects.js.

Here's an example of how to configure routing:

```javascript
export const repos = {
    "/companyx/xlib": {
        "vcs": "git",
        "repo": "git+ssh://git@gitlab.com/companyx/secretlib",
        "hasAuth": true,
        "auth": {
            "user": "fff",
            "pass": "password"
        }
    },
    "/amirarsalan/withAuth": {
        "vcs": "git",
        "repo": "https://github.com/amirarsalan/GoIsTrolly",
        "hasAuth": true,
        "auth": {
            "user": "fff",
            "pass": "password"
        }
    },
    "/amirarsalan/withoutAuth": {
        "vcs": "git",
        "repo": "https://github.com/amirarsalan/GoIsTrolly",
        "hasAuth": false
    }
};
```

* vcs: Version control system (e.g., "git").
* repo: Repository URL.
* hasAuth: Boolean indicating whether authentication is required.
* auth: Authentication credentials (if hasAuth is true).

*Important*: For production environments, consider using Cloudflare Secrets to store sensitive authentication credentials instead of hardcoding them in projects.js.



## Contributing

We welcome contributions! Feel free to open issues for bug reports, feature requests, or submit pull requests with improvements.

## License

This project is licensed under the MIT License.
