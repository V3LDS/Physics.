// Module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      World = Matter.World,
      Body = Matter.Body;

// Create engine
const engine = Engine.create();
const world = engine.world;

// Create renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#ffffff'
    }
});
// Create walls
const wallThickness = 50;
const leftWall = Bodies.rectangle(-wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true });
const rightWall = Bodies.rectangle(window.innerWidth + wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true });

// Add walls to the world
World.add(world, [leftWall, rightWall]);

// Update walls in resize function
function resize() {
    // ... existing code ...

    // Update left wall
    Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: window.innerHeight / 2 });
    Matter.Body.setVertices(leftWall, [
        { x: 0, y: 0 },
        { x: wallThickness, y: 0 },
        { x: wallThickness, y: window.innerHeight },
        { x: 0, y: window.innerHeight },
    ]);

    // Update right wall
    Matter.Body.setPosition(rightWall, { x: window.innerWidth + wallThickness / 2, y: window.innerHeight / 2 });
    Matter.Body.setVertices(rightWall, [
        { x: window.innerWidth, y: 0 },
        { x: window.innerWidth + wallThickness, y: 0 },
        { x: window.innerWidth + wallThickness, y: window.innerHeight },
        { x: window.innerWidth, y: window.innerHeight },
    ]);
}
// Create a static floor
const ground = Bodies.rectangle(400, 580, 810, 60, { isStatic: true });

// Create a cube
const cube = Bodies.rectangle(400, 200, 80, 80, {
    restitution: 0.6, // Makes the cube bouncy
    friction: 0.5
});

// Add the cube and ground to the world
World.add(world, [ground, cube]);

// Add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

World.add(world, mouseConstraint);

// Keep the mouse in sync with rendering
render.mouse = mouse;

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);