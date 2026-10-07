export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  flow: string[];
  github?: string;
  live?: string;
  status: "documented" | "pending";
  problem: string;
  architecture: string;
  implementation: string;
  challenges: string;
  solution: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "kubernetes-application-stack", number: "01", title: "From containers to a running cluster.", category: "Kubernetes deployment",
    description: "A multi-service Nginx, Node.js, and Redis application, containerized and deployed with Kubernetes.",
    technologies: ["Kubernetes", "Docker", "Nginx", "Redis"], flow: ["Ingress", "Nginx", "Node.js", "Redis"],
    status: "documented", github: "https://github.com/awais3823/devOps",
    problem: "Run a multi-service web application with repeatable packaging, service routing, and controlled updates.",
    architecture: "Ingress routes incoming traffic to Nginx, which acts as a reverse proxy for the Node.js application. Redis runs as a separate workload. Namespaces, Deployments, and Services organize the stack.",
    implementation: "Built custom Dockerfiles for the Node.js application and Nginx, published images on Docker Hub, and wrote Kubernetes manifests for the application, proxy, and Redis services.",
    challenges: "The work spans container packaging, service connectivity, and rollout verification. A specific incident or failure investigation has not yet been supplied.",
    solution: "Used explicit Deployment, Service, Ingress, and Namespace manifests. Bash and PowerShell scripts automate deployment, while kubectl set image and rollout status support controlled updates.",
    result: "The résumé documents a deployable multi-service Kubernetes stack and scripted rollouts. Production traffic, uptime, and performance measurements have not been provided.",
  },
  {
    slug: "release-driven-cicd", number: "02", title: "A release. A build. A verified rollout.", category: "CI/CD automation",
    description: "A release-triggered GitHub Actions pipeline that builds versioned images and deploys them to Kubernetes.",
    technologies: ["GitHub Actions", "Docker Hub", "Kubernetes"], flow: ["Release", "Build", "Registry", "Rollout"],
    status: "documented", github: "https://github.com/awais3823/devOps",
    problem: "Connect application releases to a repeatable build and deployment process instead of relying on manual image updates.",
    architecture: "A GitHub release triggers the workflow. Web and Nginx images are built and pushed to Docker Hub, then Kubernetes Deployments are updated and monitored for rollout completion.",
    implementation: "Configured GitHub Actions release triggers, versioned Docker image builds, GitHub Secrets for Docker Hub and kubeconfig, and deployment steps that check cluster connectivity.",
    challenges: "Cluster access, kubeconfig validity, registry credentials, and rollout timeouts need to be checked during automation. No specific failure incident has been supplied.",
    solution: "Validated kubeconfig and cluster connectivity before deployment. Updated deployment images and checked rollouts with timeouts to make incomplete deployments visible.",
    result: "The documented workflow automates image build, publishing, and Kubernetes deployment from a release. No deployment-time savings or production metrics are claimed.",
  },
  {
    slug: "docker-multi-service-labs", number: "03", title: "One stack. Reproducible environments.", category: "Containerization labs",
    description: "Python and PHP applications packaged with Docker, with service networks and persistent volumes managed through Compose.",
    technologies: ["Docker", "Docker Compose", "Python", "PHP", "MySQL"], flow: ["Application", "Docker", "Compose", "Volumes"],
    status: "documented",
    problem: "Package applications and their dependencies into predictable environments while keeping service networking and data persistence explicit.",
    architecture: "Dockerfiles package application services. Docker Compose connects Python web services, PHP applications, and MySQL through declared services, networks, and volumes.",
    implementation: "Containerized Python and PHP applications, built Dockerfiles, and deployed multi-container stacks with Compose service definitions, networks, and volumes.",
    challenges: "Service communication and persistent data are the main concerns demonstrated by these labs. A particular debugging incident is awaiting detail.",
    solution: "Defined the application stack in Compose and separated networking and persistent storage from the individual container lifecycle.",
    result: "The résumé records hands-on application containerization and Compose deployments. A direct lab repository and live environment have not been supplied.",
  },
  {
    slug: "kubernetes-workloads", number: "04", title: "Routing, persistence, and service boundaries.", category: "Kubernetes workloads & services",
    description: "Application labs exploring Python and Redis migration, persistent MySQL storage, Ingress routing, and a Redis-backed guestbook.",
    technologies: ["Kubernetes", "Ingress", "PV / PVC", "ConfigMaps", "Secrets"], flow: ["Ingress", "Service", "Workload", "Storage"],
    status: "documented",
    problem: "Move beyond individual containers to application workloads with cluster networking, external routing, configuration, and persistent data.",
    architecture: "Deployments and Services run Python and Redis workloads. MySQL uses PV/PVC storage, phpMyAdmin has its own Deployment, Service, and Ingress, and the guestbook uses a Redis leader-follower model.",
    implementation: "Migrated a Python and Redis stack from Compose to Kubernetes, configured MySQL persistent storage, used ConfigMaps and Secrets, and deployed a guestbook frontend with separate Redis workloads.",
    challenges: "Persistent data, application configuration, Ingress routing, and rolling updates form the documented lab scope. Specific incident details have not been supplied.",
    solution: "Separated application workloads, configuration, service discovery, ingress, and volume claims into declarative manifests. Used rolling updates to practice changing running workloads.",
    result: "The résumé documents these Kubernetes labs and application patterns. Production availability and benchmark results are not available.",
  },
  {
    slug: "aws-cloud-migration", number: "05", title: "A considered path into the cloud.", category: "AWS cloud migration · planned case study",
    description: "An architecture outline for assessment, VPC networking, EC2, DNS, monitoring, and recovery. Project evidence is awaiting confirmation.",
    technologies: ["AWS", "VPC", "EC2", "Route 53"], flow: ["Assess", "VPC", "EC2", "Observe"], status: "pending",
    problem: "Placeholder: add the original environment, migration constraints, and business requirements.",
    architecture: "Proposed outline: on-premises assessment → AWS VPC → EC2 → Route 53 → monitoring → backup and recovery. This is a conceptual diagram, not a claim of a completed migration.",
    implementation: "Placeholder: add confirmed services, infrastructure configuration, and migration steps.",
    challenges: "Placeholder: describe a real migration issue and the investigation.", solution: "Placeholder: explain the validated solution and tradeoffs.", result: "Awaiting confirmed project details and evidence. No migration results are claimed.",
  },
  {
    slug: "blockchain-infrastructure", number: "06", title: "Infrastructure behind the chain.", category: "Blockchain infrastructure · planned case study",
    description: "An outline connecting nodes, RPC endpoints, backend services, an explorer, and monitoring. Implementation details are pending.",
    technologies: ["Linux", "Docker", "RPC", "Monitoring"], flow: ["Node", "RPC", "Backend", "Explorer"], status: "pending",
    problem: "Placeholder: add the blockchain network, operational requirements, and deployment context.",
    architecture: "Conceptual topology: blockchain nodes → RPC → backend services → explorer, with monitoring across services. The role is provided in the brief; this project implementation is not yet documented.",
    implementation: "Placeholder: add the actual client, node configuration, infrastructure, and service deployment.",
    challenges: "Placeholder: describe a confirmed node or service investigation.", solution: "Placeholder: add the implemented response and operational tradeoffs.", result: "Awaiting project evidence. No production metrics, node counts, or availability claims are made.",
  },
];
