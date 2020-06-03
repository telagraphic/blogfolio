barba.init({
  transitions: [
    {
      name: 'fade',
      once({current, next, trigger}) {
        return new Promise(resolve => {

          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          })

          timeline
            .set('.barba-container', {opacity: 0, y: '5%'})
            .to('.barba-container', {opacity: 1, y: '0%'})
        })
      },
      enter({current, next, trigger}) {
        return new Promise(resolve => {

          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          })

          timeline
            .set(next.container, {opacity: 0, y: '5%'})
            .to(next.container, {opacity: 1, y: '0%', ease: 'power4.out'});
        })
      },
      leave({current, next, trigger}) {
        return new Promise(resolve => {

          const timeline = gsap.timeline({
            onComplete() {
              resolve();
              current.container.remove();
            }
          })

          timeline
            .to(current.container, {opacity: 0, y: '5%'});
        })
      }
    },
  ],
  debug: true
})
