import React, {ReactNode} from "react";

type ComponentProps = {text: string}
export default class ArticleBody extends React.Component<ComponentProps>{

    render(): ReactNode {
        return <div className="article-body">{this.formatText(this.props.text)}</div>;
    }

    formatText(text: string): ReactNode{
        const paragraphs =  text.split(". ").map((p, i)=><p key={i}>{p}.</p>);
        return <div>{paragraphs}</div>;
    }

}