import React, {ReactNode} from "react";
import Article from "../../models/article";
import ArticleListItem from "./list-item";
import "../../style/list.css";

type ComponentProps = {items: Article[]}
export default class ArticlesList extends React.Component<ComponentProps> {

    render(): ReactNode {

        const listItems = this.props.items.map((a, i)=><div key={i}><ArticleListItem article={a}/></div>);
        return (
            <div className="list">
                {listItems}
            </div>
        );
    }

}
