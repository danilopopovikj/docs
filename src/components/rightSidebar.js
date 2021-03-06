import React from "react";
import {graphql, StaticQuery} from "gatsby";
import styled from "react-emotion";
import './styles.scss';
import config from '../../config';
import {dropPrefix} from './utils';

const forcedNavOrder = config.sidebar.forcedNavOrder;

const Sidebar = styled('aside')`
  width: 100%;
  background-color: #fff;
  border-right: 1px solid #1f2531;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 24px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({className, active, level, subItems, ...props}) => {
  let subItemLinks = null;
  if (subItems.length > 0) {
    subItemLinks = (
      <ul className={"pl-4"}>
        {subItems.map((subLink, index) => {
          if (subLink.url) {
            const url = subLink.url.replace(/\s+|-/g, '');
            return <li className={className + " sub-level"} key={index}>
              <a href={url} key={url+index}>{subLink.title}</a>
            </li>
          }
        })
        }
      </ul>
    )
  }
  return (
    <li className={className}>
      <a href={props.to} {...props} />
      {subItemLinks}
    </li>
  );
})`
  list-style: none;

  a {
    color: #5C6975;
    text-decoration: none;
    font-weight: ${({level}) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: rgb(116, 76, 188) !important;
    }

    ${props =>
  props.active &&
  `
      color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

const SidebarLayout = ({location}) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({allMdx}) => {
      let navItems = [];
      let finalNavItems;
      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        const navItems = allMdx.edges.map((item, index) => {
          let innerItems;
          if (item !== undefined) {
            if ((dropPrefix(item.node.fields.slug) === location.pathname) || (config.gatsby.pathPrefix + dropPrefix(item.node.fields.slug)) === location.pathname) {

              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map((innerItem, index) => {
                  const itemId = innerItem.title ? innerItem.title.replace(/\s+/g, '').toLowerCase() : '#';
                  let subItems = []
                  if (innerItem.items) {
                    subItems = innerItem.items;
                  }
                  return (
                    <ListItem
                      key={index}
                      to={`#${itemId}`}
                      level={1}
                      subItems={subItems}>
                      {innerItem.title}
                    </ListItem>
                  );
                });
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <Sidebar>
            <ul className={'rightSideBarUL'}>
              <div className={'rightSideTitle'}>CONTENTS</div>
              {finalNavItems}
            </ul>
          </Sidebar>
        );
      } else {
        return (
          <Sidebar>
            <ul></ul>
          </Sidebar>
        );
      }
    }}
  />
);

export default SidebarLayout;
