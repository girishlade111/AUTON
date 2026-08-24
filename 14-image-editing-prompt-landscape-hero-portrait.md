# Prompt 14 — Image Editing Prompt: Landscape Hero Portrait (16:9 Outpaint)

> **How to use this file:** Feed the prompt block in Section A (plus your original portrait image) into an AI image-editing tool — Adobe Photoshop (Generative Expand / Firefly), Gemini "Nano Banana", Flux Fill/Kontext, Midjourney Editor, or DALL-E. Section B contains per-tool notes. Section C is the QA checklist for the result.

---

## A. Master Image-Editing Prompt (copy-paste everything below)

```
TASK: Outpaint and extend the attached studio portrait into a 16:9 LANDSCAPE image
(final canvas 3840 × 2160 px, minimum acceptable 1920 × 1080 px) for use as a
full-width website hero background on a pure-black page.

SOURCE DESCRIPTION (the attached image):
A studio portrait of a young man in his mid-20s with short, textured brown hair,
clean-shaven, neutral confident expression, looking directly into the camera. He
wears a plain black crew-neck top. Soft, diffused key light from the front-left
creates gentle modeling on his face; skin tones are natural and slightly
desaturated (matte editorial grade). The background is a pure black studio
backdrop, and the bottom of the frame already dissolves into black so his
shoulders fade into darkness.

EDITING INSTRUCTIONS — follow exactly:

1. CANVAS & PLACEMENT
   - Expand the canvas from its current aspect ratio to 16:9 landscape.
   - Keep the subject EXACTLY the same size and scale as in the source — do not
     zoom, crop tighter, or shrink him. He must remain horizontally centered,
     with the top of his hair ~8–10% below the new top edge (headroom).
   - All new pixels are added to the LEFT and RIGHT sides (roughly equal amounts
     each side). If the tool requires it, up to 5% may be added to the top edge.

2. OUTPAINTED AREAS (left and right extensions)
   - Fill with a seamless continuation of the pure black studio backdrop
     (#000000 core, allowing subtle vignette up to #0a0a0a near the subject).
   - The extension must be featureless: NO walls, NO gradients bands, NO light
     spots, NO furniture, NO hands, NO shoulders, NO new objects, NO people,
     NO text, NO logos, NO watermarks.
   - Replicate the source image's exact noise structure / film grain and any
     subtle compression texture so the seam is invisible at 100% zoom.
   - Continue the existing soft lighting falloff: the faint glow around the
     subject's silhouette may extend a few hundred pixels, then must fall to
     true black well before the left/right edges of the canvas.

3. BOTTOM FADE (critical for website overlay)
   - Preserve/strengthen the existing bottom fade so the subject's torso
     dissolves into pure black by ~85% of the canvas height. The lower ~15%
     of the final image must be pure black (#000000), because large white
     display text will be overlaid across the lower third of this image.

4. COMPOSITION SAFE-ZONES (keep clear of any detail)
   - Lower third (y = 62%–100%): near-pure black — text overlay zone.
   - Left 15% and right 15% of the canvas: pure black — safe margins.
   - Center 40% width, upper 60% height: the subject — untouched.

5. SUBJECT INTEGRITY (do not regenerate the person)
   - The man's face, hair, expression, clothing, and pose must remain
     PIXEL-IDENTICAL to the source. This is an outpaint/extend job, NOT a
     re-generation. If the tool regenerates the subject, the result is a
     failure. Only the added black regions may be synthesized.

6. COLOR GRADE & TECHNICAL MATCH
   - Match the source grade: slightly desaturated, matte blacks (no crushed
     blue tint), natural skin tones, soft contrast.
   - Output: sRGB, PNG (preferred) or maximum-quality JPG, 3840 × 2160 px,
     no sharpening artifacts, no visible seam lines where original meets
     generated areas.

NEGATIVE PROMPT (exclude): text, watermark, logo, border, frame, second person,
extra limbs, hands, shoulders in the extensions, visible seam, patchwork
texture, repeated face, blur, noise mismatch, color banding, gray gradient
background, studio lights, equipment, furniture.
```

---

## B. Tool-Specific Notes

**Adobe Photoshop — Generative Expand (Firefly):**
1. Open the portrait → Image > Canvas Size → set 3840 × 2160 (or 1920 × 1080), anchor CENTER.
2. Select the two empty side rectangles with the Rectangular Marquee (leave ~40px overlap onto the photo so Firefly blends).
3. Generative Expand with the prompt from Section A (Firefly ignores negative prompts — instead add "empty black studio background" as a positive phrase and keep the selection tight).
4. Generate 3 variants; pick the darkest, cleanest one. If grain mismatch is visible, add 1% monochrome noise to the extensions only (Filter > Noise > Add Noise, Gaussian, Monochromatic).
5. Final pass: paint pure black (#000000) over the bottom 15% and outer 10% edges with a large soft black brush at 100% opacity to enforce the safe zones.

**Gemini / "Nano Banana" style chat editors:**
Upload the portrait and paste Section A verbatim, prepended with: "Edit this image only by extending the canvas — do not alter the person." Request the output at the highest available resolution, then upscale to 3840 × 2160 with a dedicated upscaler if needed (Topaz, Magnific, or Real-ESRGAN at conservative settings to avoid plastic skin on the subject).

**Flux (Fill / Kontext) or SDXL inpainting workflows:**
- Mask everything EXCEPT the subject (feather 32px).
- Denoise 0.35–0.5 on the masked area only, prompt: "pure black studio backdrop, seamless, subtle film grain, vignette falloff".
- Composite the ORIGINAL unmasked pixels back at 100% so the subject is untouched.

**Midjourney Editor (Canvas expand):**
Use the editor's zoom/expand to 16:9, reposition subject center, and paste Section A as the reprompt. Midjourney regenerates globally — expect minor subject drift; if the face changes, fall back to Photoshop/Flux.

---

## C. Result QA Checklist

- [ ] Final aspect ratio exactly 16:9; ≥ 1920 × 1080 (ideally 3840 × 2160).
- [ ] Subject pixel-identical to source: same face, hair, clothing, scale, centered.
- [ ] Side extensions are featureless black with matched grain — no seam visible at 100% zoom.
- [ ] Bottom 15% is pure black (text-overlay safe); outer left/right 15% near-pure black.
- [ ] No banding, no gray gradient, no added objects, no text/watermarks.
- [ ] Grade matches source (matte, slightly desaturated, natural skin).
- [ ] File: sRGB PNG (or JPG q≥90), under ~8MB for web (export a 1920w WebP copy for production).
