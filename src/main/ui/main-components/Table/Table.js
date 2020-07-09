import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import {connect} from "react-redux";
import {LoadingTableCards} from "../../../bll/table-cards-reducer";


let UsersTable = (props) => {

    useEffect(
        ()=> {props.LoadingTableCards()},[]
    );

    const columns = [
        {   title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {                                               
            title: 'Created',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Updated',
            dataIndex: 'address',
            key: 'address',
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <>
        //             {tags.map(tag => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
    ];

    let dataOfCards = props.cardPacks.map(c =>{
        return {key:c._id,name:c.name, age: c.created,address:c.updated}
    })
    const data = [
        // {dataOfCards}
        {
            key: props.cardPacks[0]._id,
            name: props.cardPacks[0].name,
            age: props.cardPacks[0].created,
            address: props.cardPacks[0].updated,
        },
        {
            key: props.cardPacks[1]._id,
            name: props.cardPacks[1].name,
            age: props.cardPacks[1].created,
            address: props.cardPacks[1].updated,
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];


    return (
        <>
            <Table columns={columns} dataSource={data}/>
        </>
    )
};

const mapStateToProps = (state) => {
    debugger
    return {
        cardPacks: state.loadingDeckOfCards.cardPacks,
        token: state.login.token
    }
};
// const mapDispatchToProps = (dispatch) => {
//     debugger
//     return {
//         LoadingTableCards : () => {
//             dispatch(LoadingTableCards())
//         }
// }
// };
const ConnectedUsersTable = connect(mapStateToProps, {LoadingTableCards})(UsersTable);
export default ConnectedUsersTable;


