function drawPing() {
    let time = 0;
    let particles = [];
    const pingPoint = () => {
        const canvas = document.querySelector("#ping-canvas");
        const ctx = canvas.getContext('2d');
        const radius = 70;

        time++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (window.PING){
            window.PING.forEach((p) => {
                if (p.lifespan < 1){
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 0, 0, ${p.lifespan})`;
                    ctx.lineWidth = 0.25 + (2.75*(p.lifespan))
                    ctx.arc(p.x, p.y, Math.pow((1 - p.lifespan), 0.25)*radius, 0, 2 * Math.PI);
                    ctx.stroke();
                } else {
                    if (time % 3 === 0){
                        let angle = Math.random()*360;
                        let radAngle = (Math.PI * angle) / 180
                        let originX = p.x + Math.random()*10 - 5;
                        let originY = p.y + Math.random()*10 - 5;;
                        particles.push({angle: angle, originX, originY, lifespan: 1 })
                    }
                    
                }
            });

            particles.forEach((p) => {
                let reverseLifeSpan = 1 - p.lifespan;
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 0, 0, ${reverseLifeSpan})`;
                let angle = p.angle;
                let radAngle = (Math.PI * angle) / 180;
                let distance = 160 * (Math.pow(p.lifespan, 0.5));
                ctx.arc(p.originX + (Math.cos(radAngle)*distance),p.originY + (Math.sin(radAngle)*distance), 1, 0, 2 * Math.PI)
                ctx.fill();
            })

            particles = particles.map((p) => {
                let rp = {...p};
                rp.lifespan -= (1/30);
                return rp
            })

            particles = particles.filter(p => p.lifespan > 0)

            window.PING = window.PING.map((p) => {
                let rePing = {...p}
                if ((this.renderReady && rePing.lifespan === 1) || rePing.lifespan < 1){rePing.lifespan -= (1/50)}
                return rePing
            })

            window.PING = window.PING.filter(p => p.lifespan > 0)
        }

        requestAnimationFrame(pingPoint)
    }

    if (this.renderReady){
        var divContainer = document.querySelector(".container");
        var divPing = document.querySelector("#ping-canvas");

        var width = divContainer.offsetWidth;
        var height = divContainer.offsetHeight;

        divPing.setAttribute('width', width);
        divPing.setAttribute('height', height);

        pingPoint()
    }
}

export default drawPing