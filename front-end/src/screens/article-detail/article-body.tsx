import React, {ReactNode} from "react";

type ComponentProps = {text: string}
export default class ArticleBody extends React.Component<ComponentProps>{

    render(): ReactNode {
        return <div className="article-body">{this.formatText(this.props.text)}</div>;
    }

    formatText(text: string): string{
        return text.split(". ").map();
    }

}