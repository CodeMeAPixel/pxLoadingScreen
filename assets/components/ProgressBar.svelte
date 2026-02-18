<script>
  export let value = 0
  export let label = 'Loading...'
  export let color = '#ff6b35'
</script>

<div class="progress">
  <div class="progress-info">
    <span class="progress-label">{label}</span>
    <span class="progress-pct">{Math.floor(value)}%</span>
  </div>
  <div class="progress-track" style="--bar-color: {color};">
    <div class="progress-fill" style="width: {value}%; --bar-color: {color};" />
    <div class="progress-dot" style="left: {value}%; --bar-color: {color};">
      <img src="https://cmap.lol/icon.svg" alt="" class="progress-dot-icon" />
    </div>
  </div>
</div>

<style>
  .progress {
    width: 100%;
  }

  .progress-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .progress-label {
    font-size: 0.8rem;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 1.2px;
    font-weight: 700;
  }

  .progress-pct {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  .progress-track {
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 3px;
    position: relative;
    /* overflow visible so the dot icon can protrude */
    overflow: visible;
  }

  .progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--bar-color), color-mix(in srgb, var(--bar-color), white 30%));
    border-radius: 3px;
    transition: width 0.5s ease-out;
    box-shadow:
      0 0 8px var(--bar-color),
      0 0 20px color-mix(in srgb, var(--bar-color), transparent 50%);
    overflow: hidden;
  }

  .progress-dot {
    position: absolute;
    top: 50%;
    /* translate(-100%, -50%) anchors the right edge of the dot to the fill end */
    transform: translate(-50%, -50%);
    transition: left 0.5s ease-out;
    pointer-events: none;
    z-index: 2;
  }

  .progress-dot-icon {
    display: block;
    width: 18px;
    height: 18px;
    object-fit: contain;
    filter:
      drop-shadow(0 0 6px var(--bar-color))
      drop-shadow(0 0 12px color-mix(in srgb, var(--bar-color), transparent 40%));
    animation: dotPulse 2s ease-in-out infinite;
  }

  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.85; }
  }
</style>
