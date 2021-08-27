import React, {ReactNode} from "react";

type ComponentProps = {text: string}
export default class ArticleBody extends React.Component<ComponentProps>{

    render(): ReactNode {
        return this.props.text;
    }

}