import requests from "..";


export const getBanner = () =>requests({url:"banner?type=2",method:"GET"})

export const getMusicList = () =>requests({url:"personalized?limit=10",method:"GET"})