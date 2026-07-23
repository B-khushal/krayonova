import type { NextPageContext } from "next";

export default function ErrorPage({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};
