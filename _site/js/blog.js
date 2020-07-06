// <section class="work__project">
//   <a class="portfolio" href="http://www.flexulator.com/">
//     <header class="portfolio__header">
//       <h3>Flexulator</h3>
//     </header>
//     <section class="portfolio__body">
//       <section class="portfolio__picture">
//         <img src="{{site.baseurl}}assets/img/portfolio/flexulator.png" alt="Flexulator"></img>
//       </section>
//       <section class="portfolio__description">
//         <p>
//           Flexbox space distribution algorithm visualizer
//         </p>
//       </section>
//     </section>
//   </a>
// </section>

const projects = document.querySelectorAll('.work__project');

projects.forEach(project => {
  project.addEventListener('mouseenter', function(event) {
    let description = event.target.children[0].children[1].children[1];

    gsap
      .timeline()
      .to(description, {opacity:.9, duration: .25})
      .to(description.children[0], {opacity:1, duration: .25}, '>');
  })
})

projects.forEach(project => {
  project.addEventListener('mouseleave', function(event) {
    let description = event.target.children[0].children[1].children[1];

    gsap
      .timeline()
      .to(description, {opacity:0, duration: .25})
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
