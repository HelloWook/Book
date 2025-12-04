import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { useHistory } from "@docusaurus/router";
import { useEffect } from "react";
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();

  useEffect(() => {
    history.push("/docs/intro");
  }, []);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Findev 팀의 블로그입니다."
    >
      <main></main>
    </Layout>
  );
}
