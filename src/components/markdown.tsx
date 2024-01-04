import { type JSXChildren, component$ } from "@builder.io/qwik";
import type { Root } from "remark-parse/lib";
import type { RootContent } from "mdast";
import StaticImg from "./static-img";
import { Link } from "@builder.io/qwik-city";

type MarkdownProps = {
  root: Root;
};

type RenderContext = {
  footnotes: Map<string, JSXChildren>;
  defs: Map<string, string>;
};

function listupDefinitions(ctx: RenderContext, root: RootContent) {
  switch (root.type) {
    case "blockquote":
      break;
    case "break":
      break;
    case "code":
      break;
    case "definition":
      ctx.defs.set(root.identifier, root.url);
      break;
    case "delete":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "emphasis":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "footnoteDefinition":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "footnoteReference":
      break;
    case "heading":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "html":
      break;
    case "image":
      break;
    case "imageReference":
      break;
    case "inlineCode":
      break;
    case "link":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "linkReference":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "list":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "listItem":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "mdxFlowExpression":
      break;
    case "mdxJsxFlowElement":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "mdxJsxTextElement":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "mdxTextExpression":
      break;
    case "mdxjsEsm":
      break;
    case "paragraph":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "strong":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "table":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "tableCell":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "tableRow":
      root.children.forEach((child) => listupDefinitions(ctx, child));
      break;
    case "text":
      break;
    case "thematicBreak":
      break;
    case "yaml":
      break;
  }
}

function md(ctx: RenderContext, root: RootContent): JSXChildren {
  switch (root.type) {
    case "break":
      return <br />;
    case "blockquote":
      return (
        <blockquote>{root.children.map((child) => md(ctx, child))}</blockquote>
      );
    case "code":
      // TODO language support
      return (
        <code>
          <pre>{root.value}</pre>
        </code>
      );
    case "definition":
      ctx.defs.set(root.identifier, root.url);
      return (
        <dl>
          <dt>{root.identifier}</dt>
          <dd>
            <Link href={root.url}>{root.url}</Link>
          </dd>
        </dl>
      );
    case "delete":
      return <del>{root.children.map((child) => md(ctx, child))}</del>;
    case "emphasis":
      return <em>{root.children.map((child) => md(ctx, child))}</em>;
    case "footnoteDefinition":
      ctx.footnotes.set(
        root.identifier,
        root.children.map((child) => md(ctx, child)),
      );
      return null;
    case "footnoteReference":
      return <Link href={`#${root.identifier}`}>{root.identifier}</Link>;
    case "heading":
      const inner = root.children.map((child) => md(ctx, child));
      switch (root.depth) {
        case 1:
          return <h1>{inner}</h1>;
        case 2:
          return <h2>{inner}</h2>;
        case 3:
          return <h3>{inner}</h3>;
        case 4:
          return <h4>{inner}</h4>;
        case 5:
          return <h5>{inner}</h5>;
        case 6:
          return <h6>{inner}</h6>;
      }
      break;
    case "html":
      return <div dangerouslySetInnerHTML={root.value}></div>;
    case "image":
      return <StaticImg src={root.url} alt={root.alt ? root.alt : ""} />;
    case "paragraph":
      return <p>{root.children.map((child) => md(ctx, child))}</p>;
    case "text":
      return root.value;
    case "imageReference": {
      // TODO
      const refUrl = ctx.defs.get(root.identifier);
      if (refUrl) {
        return <StaticImg src={refUrl} alt={root.alt ? root.alt : ""} />;
      } else {
        return <div></div>;
      }
    }
    case "inlineCode":
      return <code>{root.value}</code>;
    case "link":
      return (
        <Link href={root.url}>
          {root.children.map((child) => md(ctx, child))}
        </Link>
      );
    case "linkReference": {
      const refUrl = ctx.defs.get(root.identifier);
      const children = root.children.map((child) => md(ctx, child));
      if (refUrl) {
        return <Link href={refUrl}>{children}</Link>;
      } else {
        return <span>{children}</span>;
      }
    }
    case "list": {
      const children = root.children.map((child) => md(ctx, child));
      if (root.ordered) {
        return <ol>{children}</ol>;
      } else {
        return <ul>{children}</ul>;
      }
    }
    case "listItem":
      return <li>{root.children.map((child) => md(ctx, child))}</li>;
    case "mdxFlowExpression":
      // to be ignored
      return null;
    case "mdxJsxFlowElement":
      // to be ignored
      return null;
    case "mdxJsxTextElement":
      // to be ignored
      return null;
    case "mdxTextExpression":
      // to be ignored
      return null;
    case "mdxjsEsm":
      // to be ignored
      return null;
    case "strong":
      return <strong>{root.children.map((child) => md(ctx, child))}</strong>;
    case "table":
      return (
        <table>
          <thead>{md(ctx, root.children[0])}</thead>
          <tbody>
            {root.children
              .slice(1, root.children.length)
              .map((child) => md(ctx, child))}
          </tbody>
        </table>
      );
    case "tableCell":
      return <td>{root.children.map((child) => md(ctx, child))}</td>;
    case "tableRow":
      return <tr>{root.children.map((child) => md(ctx, child))}</tr>;
    case "thematicBreak":
      // to be ignored
      return null;
    case "yaml":
      // to be ignored
      return null;
  }
}

export default component$((props: MarkdownProps) => {
  const ctx = { footnotes: new Map(), defs: new Map() };
  props.root.children.forEach((child) => listupDefinitions(ctx, child));
  return <div>{props.root.children.map((child) => md(ctx, child))}</div>;
});
