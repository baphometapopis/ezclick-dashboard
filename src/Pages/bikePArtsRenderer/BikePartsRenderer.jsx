import React, { useEffect } from 'react';
import { API_BASE_IMG_URL } from '../../Api/Api_Endpoint';
import './BikePartsRenderer.css';

export const BikeInspectionView = ({report}) => {

  const color=report?.qsn_ans?.color??{}
  // console.log(color,'lkjhgfd')

  // const color = {
  //   "1": "red", "2": "grey", "3": "grey", "4": "grey", "5": "grey", "6": "grey", "7": "grey", 
  //   "8": "grey", "9": "grey", "10": "grey", "11": "grey", "12": "grey", "13": "grey", "14": "grey", 
  //   "15": "grey", "16": "grey", "17": "grey", "18": "grey", "19": "grey", "20": "grey", "21": "grey", 
  //   "22": "grey", "23": "red", "24": "grey", "25": "grey", "26": "grey", "27": "grey", "28": "grey", 
  //   "29": "grey", "30": "grey", "31": "grey", "32": "grey", "33": "grey", "34": "grey", "35": "grey", 
  //   "36": "grey", "37": "grey", "38": "grey", "39": "grey", "40": "grey", "41": "grey", "42": "grey", 
  //   "43": "grey", "44": "grey", "45": "grey", "46": "grey", "47": "grey", "48": "grey", "49": "grey", 
  //   "50": "grey", "51": "grey", "52": "grey", "53": "grey", "54": "grey", "55": "grey", "56": "grey", 
  //   "57": "grey", "58": "grey"
  // };


  

  const imageList = [
    { id: 'right_1', src: `1`, style: { top: '6px', right: '163px' }, title: 'Back Mudguard', positions: 'right,left,top', ids: '1,1,1' },
    { id: 'right_2', src: `2`, style: { top: '7px', right: '172px' }, title: 'Back Tyre', positions: 'right,left', ids: '2,2' },
    { id: 'right_3', src: `3`, style: { top: '24px', right: '191px' }, title: 'Back Rim', positions: 'right,left', ids: '3,3' },
    { id: 'right_4', src: `4`, style: { top: '61px', right: '205px' }, title: 'Right Rear axel', positions: 'right,left', ids: '4,4' },
    { id: 'right_5', src: `5`, style: { top: '70px', right: '252px' }, title: 'Stand', positions: 'right,left', ids: '5,5' },
    { id: 'right_6', src: `6`, style: { top: '55px', right: '160px' }, title: 'Back Right Indicator', positions: 'right,top', ids: '6,3' },
    { id: 'right_7', src: `7`, style: { top: '57px', right: '142px' }, title: 'TailLight', positions: 'right,left,top', ids: '7,7,2' },
    { id: 'right_8', src: `8`, style: { top: '64px', right: '131px' }, title: 'Back Rest', positions: 'right,left,top', ids: '8,8,5' },
    { id: 'right_9', src: `9`, style: { top: '87px', right: '180px' }, title: 'Back Right Side fork', positions: 'right', ids: '9' },
    { id: 'right_11', src: `11`, style: { top: '69px', right: '156px' }, title: 'Seats', positions: 'right,left,top', ids: '11,11,6' },
    { id: 'right_12', src: `12`, style: { top: '100px', right: '181px' }, title: 'Center Body', positions: 'right,left,top', ids: '12,12,7' },
    { id: 'right_13', src: `13`, style: { top: '150px', right: '156px' }, title: 'Chassis Top Side', positions: 'right,left', ids: '13,13' },
    { id: 'right_14', src: `14`, style: { top: '152px', right: '141px' }, title: 'Petrol Tank', positions: 'right,left,top', ids: '14,14,11' },
    { id: 'right_15', src: `15`, style: { top: '180px', right: '223px' }, title: 'Silencer', positions: 'right,left,top', ids: '15,15,26' },
    { id: 'right_16', src: `16`, style: { top: '203px', right: '186px' }, title: 'Engine', positions: 'right,left', ids: '16,16' },
    { id: 'right_17', src: `17`, style: { top: '241px', right: '177px' }, title: 'Fuel Pipe', positions: 'right,left', ids: '17,17' },
    { id: 'right_18', src: `18`, style: { top: '239px', right: '100px' }, title: 'Rear View Right Mirror', positions: 'right,top', ids: '18,17' },
    { id: 'right_19', src: `19`, style: { top: '235px', right: '115px' }, title: 'Odometer', positions: 'right,left,top', ids: '19,19,16' },
    { id: 'right_20', src: `20`, style: { top: '262px', right: '156px' }, title: 'Front Right Side fork', positions: 'right,top', ids: '20,22' },
    { id: 'right_21', src: `21`, style: { top: '270px', right: '147px' }, title: 'Front RightSide Indicator', positions: 'right,top', ids: '21,19' },
    { id: 'right_22', src: `22`, style: { top: '272px', right: '124px' }, title: 'Headlight', positions: 'right,left,top', ids: '22,22,21' },
    { id: 'right_23', src: `23`, style: { top: '292px', right: '168px' }, title: 'Front Mudguard', positions: 'right,left,top', ids: '23,23,24' },
    { id: 'right_24', src: `24`, style: { top: '287px', right: '179px' }, title: 'Front Tyre', positions: 'right,left,top', ids: '24,24,25' },
    { id: 'right_25', src: `25`, style: { top: '305px', right: '198px' }, title: 'Front Rim', positions: 'right,left', ids: '25,25' }
  ];


  const topViewImageList = [
    { id: 'top_1', src: '1', style: { left: '387px', top: '19px' }, title: 'Back Mudguard', positions: 'right,left,top', ids: '1,1,1' },
    { id: 'top_3', src: '3', style: { left: '372px', top: '55px' }, title: 'Back Right Indicator', positions: 'right,top', ids: '6,3' },
    { id: 'top_4', src: '4', style: { left: '406px', top: '55px' }, title: 'Back Left Indicator', positions: 'left,top', ids: '6,4' },
    { id: 'top_2', src: '2', style: { left: '384px', top: '35px' }, title: 'TailLight', positions: 'right,left,top', ids: '7,7,2' },
    { id: 'top_5', src: '5', style: { left: '380px', top: '61px' }, title: 'Back Rest', positions: 'right,left,top', ids: '8,8,5' },
    { id: 'top_6', src: '6', style: { left: '377px', top: '73px' }, title: 'Seats', positions: 'right,left,top', ids: '11,11,6' },
    { id: 'top_7', src: '7', style: { left: '369px', top: '99px' }, title: 'Center Body', positions: 'right,left,top', ids: '12,12,7' },
    { id: 'top_11', src: '11', style: { left: '373px', top: '158px' }, title: 'Petrol Tank', positions: 'right,left,top', ids: '14,14,11' },
    { id: 'top_26', src: '26', style: { left: '342px', top: '50px' }, title: 'Silencer', positions: 'right,left,top', ids: '15,15,26' },
    { id: 'top_17', src: '17', style: { left: '322px', top: '237px' }, title: 'Rear View Right Mirror', positions: 'right,top', ids: '18,17' },
    { id: 'top_18', src: '18', style: { left: '417px', top: '236px' }, title: 'Rear View Left Mirror', positions: 'left,top', ids: '18,18' },
    { id: 'top_16', src: '16', style: { left: '384px', top: '236px' }, title: 'Odometer', positions: 'right,left,top', ids: '19,19,16' },
    { id: 'top_22', src: '22', style: { left: '369px', top: '293px' }, title: 'Front Right Side fork', positions: 'right,top', ids: '20,22' },
    { id: 'top_23', src: '23', style: { left: '408px', top: '293px' }, title: 'Front Left Side fork', positions: 'left,top', ids: '20,23' },
    { id: 'top_19', src: '19', style: { left: '366px', top: '253px' }, title: 'Front RightSide Indicator', positions: 'right,top', ids: '21,19' },
    { id: 'top_20', src: `20`, style: { left: '411px', top: '252px' }, title: 'Front LeftSide Indicator', positions: 'left,top', ids: '21,20' },
    { id: 'top_21', src: `21`, style: { left: '378px', top: '256px' }, title: 'Headlight', positions: 'right,left,top', ids: '22,22,21' },
    { id: 'top_24', src: `24`, style: { left: '383px', top: '297px' }, title: 'Front Mudguard', positions: 'right,left,top', ids: '23,23,24' },
    { id: 'top_25', src: `25`, style: { left: '388px', top: '359px' }, title: 'Front Tyre', positions: 'right,left,top', ids: '24,24,25' }
  ];
  
  
  const leftView = [
    { id: 'left_1', src: `1`, style: { top: '6px', left: '160px' }, title: 'Back Mudguard', positions: 'right,left,top', ids: '1,1,1' },
    { id: 'left_2', src: `2`, style: { top: '7px', left: '172px' }, title: 'Back Tyre', positions: 'right,left', ids: '2,2' },
    { id: 'left_3', src: `3`, style: { top: '24px', left: '191px' }, title: 'Back Rim', positions: 'right,left', ids: '3,3' },
    { id: 'left_4', src: `4`, style: { top: '61px', left: '205px' }, title: 'Right Rear axel', positions: 'right,left', ids: '4,4' },
    { id: 'left_5', src: `5`, style: { top: '70px', left: '252px' }, title: 'Stand', positions: 'right,left', ids: '5,5' },
    { id: 'left_6', src: `6`, style: { top: '55px', left: '160px' }, title: 'Back Left Indicator', positions: 'left,top', ids: '6,4' },
    { id: 'left_7', src: `7`, style: { top: '57px', left: '142px' }, title: 'TailLight', positions: 'right,left,top', ids: '7,7,2' },
    { id: 'left_8', src: `8`, style: { top: '64px', left: '131px' }, title: 'Back Rest', positions: 'right,left,top', ids: '8,8,5' },
    { id: 'left_9', src: `9`, style: { top: '87px', left: '180px' }, title: 'Back Left Side fork', positions: 'left', ids: '9' },
    { id: 'left_11', src: `11`, style: { top: '69px', left: '156px' }, title: 'Seats', positions: 'right,left,top', ids: '11,11,6' },
    { id: 'left_12', src: `12`, style: { top: '100px', left: '181px' }, title: 'Center Body', positions: 'right,left,top', ids: '12,12,7' },
    { id: 'left_13', src: `13`, style: { top: '150px', left: '156px' }, title: 'Chassis Top Side', positions: 'right,left', ids: '13,13' },
    { id: 'left_14', src: `14`, style: { top: '152px', left: '141px' }, title: 'Petrol Tank', positions: 'right,left,top', ids: '14,14,11' },
    { id: 'left_15', src: `15`, style: { top: '180px', left: '223px' }, title: 'Silencer', positions: 'right,left,top', ids: '15,15,26' },
    { id: 'left_16', src: `16`, style: { top: '203px', left: '186px' }, title: 'Engine', positions: 'right,left', ids: '16,16' },
    { id: 'left_17', src: `17`, style: { top: '241px', left: '177px' }, title: 'Fuel Pipe', positions: 'right,left', ids: '17,17' },
    { id: 'left_18', src: `18`, style: { top: '239px', left: '100px' }, title: 'Rear View Left Mirror', positions: 'left,top', ids: '18,18' },
    { id: 'left_19', src: `19`, style: { top: '235px', left: '115px' }, title: 'Odometer', positions: 'right,left,top', ids: '19,19,16' },
    { id: 'left_20', src: `20`, style: { top: '262px', left: '156px' }, title: 'Front Left Side fork', positions: 'left,top', ids: '20,23' },
    { id: 'left_21', src: `21`, style: { top: '270px', left: '147px' }, title: 'Front LeftSide Indicator', positions: 'left,top', ids: '21,20' },
    { id: 'left_22', src: `22`, style: { top: '272px', left: '124px' }, title: 'Headlight', positions: 'right,left,top', ids: '22,22,21' },
    { id: 'left_23', src: `23`, style: { top: '292px', left: '168px' }, title: 'Front Mudguard', positions: 'right,left,top', ids: '23,23,24' },
    { id: 'left_24', src: `24`, style: { top: '287px', left: '179px' }, title: 'Front Tyre', positions: 'right,left,top', ids: '24,24,25' },
    { id: 'left_25', src: `25`, style: { top: '305px', left: '198px' }, title: 'Front Rim', positions: 'right,left', ids: '25,25' }
  ];
  
 useEffect(()=>{},[color,report])
  return (
    <div className="bike-container" id="breport">
      {report&& <><div className="bike-hori-left">
        {imageList?.map((image) => (
          <img
            key={image.id}
            id={image.id}
            src={`${API_BASE_IMG_URL}/Two_Wheeler_ButterFly/rightview/${image.src}_${color?.[image.src]==='yellow'?'red':color?.[image.src]==='red'?'red':'grey'}.png`}
            style={image.style}
            title={image.title}
          />
        ))}
        {/* <img src={`${API_BASE_IMG_URL}/Two_Wheeler_ButterFly/rightview/right-view.png`} alt="" style={{ left: '90px', top: '370px' }} /> */}
      </div>
      <div className="bike-hori-right">
        {/* Add horizontal right images here */}
        {leftView.map((image) => (
          <img
            key={image.id}
            id={image.id}
            src={`${API_BASE_IMG_URL}/Two_Wheeler_ButterFly/leftview/${image.src}_${color?.[image.src]==='yellow'?'red':color?.[image.src]==='red'?'red':'grey'}.png`}
            style={image.style}
            title={image.title}
          />
        ))}
      </div>
      <div className="bike-vert">
        {/* Add vertical images here */}
        {topViewImageList.map((image) => (
          <img
            key={image.id}
            id={image.id}
            src={`${API_BASE_IMG_URL}/Two_Wheeler_ButterFly/topview/${image.src}_${color?.[image.src]==='yellow'?'red':color?.[image.src]==='red'?'red':'grey'}.png`}
            style={image.style}
            title={image.title}
          />
        ))}
      </div></>}
    
    </div>
  );
};

