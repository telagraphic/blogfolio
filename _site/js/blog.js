const projects = document.querySelectorAll('.work__project');

projects.forEach(project => {
  project.addEventListener('mouseenter', function(event) {
    let picture = event.target.children[0].children[1].children[0];
    let description = event.target.children[0].children[1].children[1];

    gsap
      .timeline()
      .set(description, {opacity: 0})
      .to(description, {opacity:1, duration: .5})
      .to(description.children[0], {opacity:1, duration: .25}, '<');
  })
})

projects.forEach(project => {
  project.addEventListener('mouseleave', function(event) {
    let picture = event.target.children[0].children[1].children[0];
    let description = event.target.children[0].children[1].children[1];

    gsap
      .timeline()
      .to(description, {opacity:0, duration: .25, ease: 'power2.out'})
      .to(description.children[0], {opacity:0, duration: .25}, '>');
  })
})


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
