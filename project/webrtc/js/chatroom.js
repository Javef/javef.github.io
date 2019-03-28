
// 产生随机数
if (!location.hash) {
    location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
// 获取房间号
const roomHash = location.hash.substring(1);

// 放置自己的频道id(注册了ScaleDrone官网后创建channel会产生一个独一无二的id)
const drone = new ScaleDrone('Or1cNvRm1vqhd2Zt');

// 房间名必须以 'observable-'开头
const roomName = 'observable-'+roomHash;

const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:19302' //stuns server使用谷歌的stun服务
    }]
};

let room;
let pc;

function onSuccess() {};

function onError(error) {
    console.error(error);
};

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  room = drone.subscribe(roomName);
  room.on('open', error => {
    if (error) {
      onError(error);
    }
  });
  // 已经链接到房间后，就会收到一个members数组，代表房间里的成员
  room.on('members', members => {
    console.log('MEMBERS', members);
    // If we are the second user to connect to the room we will be creating the offer
    const isOfferer = members.length === 2;
    // 这时候信令服务已经就绪
    startWebRTC(isOfferer);
  });
});

//通过Scaledrone发送信令消息
function sendMessage(message) {
    drone.publish({
        room: roomName,
        message
    });
}

function startWebRTC(isOfferer) {
    pc = new RTCPeerConnection(configuration);

    // 当本地ICE Agent需要通过信号服务器发送信息到其他端时
    // 会触发icecandidate事件回调
    pc.onicecandidate = event => {
    if (event.candidate) {
            sendMessage({'candidate': event.candidate});
        }
    };

    // 如果用户是第二个进入的人，就在negotiationneeded 事件后创建sdp
    if (isOfferer) {
        // onnegotiationneeded 在要求sesssion协商时发生
        pc.onnegotiationneeded = () => {
            // 创建本地sdp描述 SDP (session描述协议)
            pc.createOffer().then(localDescCreated).catch(onError);
        }
    }

    // 当远程数据流到达时，将数据流装载到video中
    pc.ontrack = event => {
    const stream = event.streams[0];
    if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
            remoteVideo.srcObject = stream;
        }
    };

    // 获取本地媒体流
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    }).then(stream => {
        // 将本地捕获的视频流装载到本地video中
        localVideo.srcObject = stream;
        // 将本地流加入RTCPeerConnection 实例中 发送到其他端
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
    }, onError);
    
    // 从Scaledrone监听信令数据
    room.on('data', (message, client) => {
        // 消息是从我这里发送的，则不用处理
        if (client.id === drone.clientId) {
          return;
        }

        if (message.sdp) {
            // 设置远程sdp, 在offer 或者 answer后
            pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                // 当收到offer 后就接听
                if (pc.remoteDescription.type === 'offer') {
                    pc.createAnswer().then(localDescCreated).catch(onError);
                }
            }, onError);
        }
        
        else if (message.candidate) {
            // 增加新的 ICE canidatet 到本地的链接中
            pc.addIceCandidate(
                new RTCIceCandidate(message.candidate), onSuccess, onError
            );
        }
  });
}

function localDescCreated(desc) {
  pc.setLocalDescription(
    desc,
    () => sendMessage({'sdp': pc.localDescription}),
    onError
  );
}