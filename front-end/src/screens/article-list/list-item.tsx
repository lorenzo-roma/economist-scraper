import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import Article from "../../models/article";
import "../../style/list-item.css"
import fallbackImage from "../../assets/logo.png";

type ComponentProps = { article: Article};
export default class ArticleListItem extends React.Component<ComponentProps> {
  render(): ReactNode {
    const a = this.props.article;
    return (
      <div className="row list-item">
        <div className="column">
            <div className="list-item-caption">
                {a.category}
            </div>
          <Link
            to={{
              pathname: "/detail",
              search: "?url=" + encodeURIComponent(a.url),
            }} className="list-item-title"
          >
           {a.title}
          </Link>
          <div className="list-item-desc">{a.abstract}</div>
        </div>
        {this.loadImage(a.imgUrl)}
      </div>
    );
  }

  loadImage(img: string | undefined): ReactNode {
    if(img){
      return (
        <div className="center">
        <img src={img} alt="article" onError={this.addDefaultSrc} className="list-item-img"></img>
        </div>
      );
    }
  }

  addDefaultSrc(ev: any){
    ev.target.src = fallbackImage;
  }
}

