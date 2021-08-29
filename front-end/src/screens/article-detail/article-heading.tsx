import React, { ReactNode } from "react";
import ArticleDetail from "../../models/article-detail";

type ComponentProps = { detail: ArticleDetail };
export default class ArticleHeading extends React.Component<ComponentProps> {
  render(): ReactNode {
    return (
      <div className="column">
        <div className="row">
          <div className="article-section">{this.props.detail.section}</div>
          <div className="column">
            <div className="article-subheading">{this.props.detail.subHeading}</div>
            <div className="article-title">{this.props.detail.headline}</div>
            <div className="article-description">{this.props.detail.description}</div>
          </div>
        </div>
        <img alt="article" src={this.props.detail.leadImageUrl} className="my-32"></img>
      </div>
    );
  }
}
